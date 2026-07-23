import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const getGenAIClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "Nusantara Explorer" });
  });

  // AI Travel Consultant Endpoint
  app.post("/api/ai-planner", async (req, res) => {
    try {
      const { destination, category, durationDays, pax, budgetLevel, preferences } = req.body;

      const ai = getGenAIClient();
      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not configured
        return res.json({
          success: true,
          isFallback: true,
          title: `Rencana Perjalanan Custom: ${destination || "Nusantara Explorer"}`,
          summary: `Rencana rekomendasi otomatis untuk ${pax || 2} peserta, kategori ${category || "Private Trip"} selama ${durationDays || 3} Hari.`,
          highlights: [
            "Penjemputan VIP Bandara / Stasiun",
            "Akomodasi Hotel Bintang 4 / Resort Nyaman",
            "Driver & Tour Guide Lisensi Lokal Berpengalaman",
            "Dokumentasi Foto & Video Standar Professional",
            "Kuliner Khas Lokal Autentik"
          ],
          dayByDayItinerary: [
            {
              day: 1,
              title: "Penjemputan & Check-in Hotel",
              activities: "Penjemputan rombongan di titik kedatangan, makan siang kuliner khas, check-in resort, dan penikmatan sunset santai."
            },
            {
              day: 2,
              title: "Eksplorasi Destinasi Utama & Aktivitas Kelompok",
              activities: "Penjelajahan spot foto ikonik, aktivitas seru disesuaikan dengan tipe trip, makan siang seafood, dan gala dinner malam."
            },
            {
              day: 3,
              title: "Oleh-Oleh & Pengantaran Kembali",
              activities: "Sarapan pagi di hotel, belanja pusat souvenir khas, persiapan check-out, dan pengantaran kembali ke bandara/stasiun."
            }
          ],
          estimatedPricePerPax: "Rp 2.450.000 - Rp 3.850.000",
          recommendedAddons: ["Drone Photography & Videography", "Makan Malam Romantic / Gala Dinner", "VIP Upgrade Fleet Transport"],
          tips: "Membawa pakaian santai, pelindung matahari, tabung kamera, serta persiapkan kondisi fisik prima untuk aktivitas luar ruangan."
        });
      }

      const prompt = `Sebagai pakar dan konsultan perencana tur pariwisata profesional dari Nusantara Explorer (Indonesia), buatkan rencana perjalanan (itinerary) yang menarik, detail, dan realistis berdasarkan data berikut:
- Destinasi / Wilayah Target: ${destination || "Sesuai rekomendasi terbaik"}
- Tipe / Kategori Trip: ${category || "Private Trip"} (Pilihan: Private Trip, Family Holiday, Corporate Outbound, Open Trip)
- Durasi: ${durationDays || 3} Hari
- Jumlah Peserta: ${pax || 4} orang
- Kelas Anggaran: ${budgetLevel || "Standar / Hemat & Nyaman"}
- Catatan / Keinginan Khusus: ${preferences || "Aktivitas seimbang antara santai, kuliner, dan spot foto spektakuler"}

Berikan output respon dalam format JSON sesuai struktur berikut:
{
  "title": "Judul Paket Custom Rencana",
  "summary": "Ringkasan konsep perjalanan singkat (2 kalimat)",
  "highlights": ["Keunggulan 1", "Keunggulan 2", "Keunggulan 3", "Keunggulan 4"],
  "dayByDayItinerary": [
    {
      "day": 1,
      "title": "Judul Hari Pertama",
      "activities": "Uraian kegiatan lengkap dari pagi hingga malam"
    }
  ],
  "estimatedPricePerPax": "Rp X.XXX.XXX per orang",
  "recommendedAddons": ["Addon 1", "Addon 2"],
  "tips": "Saran praktis untuk rombongan"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
              dayByDayItinerary: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    activities: { type: Type.STRING }
                  },
                  required: ["day", "title", "activities"]
                }
              },
              estimatedPricePerPax: { type: Type.STRING },
              recommendedAddons: { type: Type.ARRAY, items: { type: Type.STRING } },
              tips: { type: Type.STRING }
            },
            required: ["title", "summary", "highlights", "dayByDayItinerary", "estimatedPricePerPax", "recommendedAddons", "tips"]
          }
        }
      });

      const resultText = response.text;
      if (!resultText) {
        throw new Error("Tidak ada respon dari model AI.");
      }

      const parsedData = JSON.parse(resultText);
      res.json({ success: true, ...parsedData });
    } catch (err: any) {
      console.error("AI Planner Error:", err);
      res.status(500).json({
        success: false,
        error: "Gagal membuat rekomendasi trip AI. Silakan coba beberapa saat lagi."
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nusantara Explorer Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
