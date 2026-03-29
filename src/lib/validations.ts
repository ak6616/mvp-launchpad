import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  name: z.string().max(255).optional(),
  source: z.string().max(100).optional(),
});

export const analyticsEventSchema = z.object({
  eventType: z.enum([
    "page_view",
    "cta_click",
    "form_submit",
    "confirmed",
  ]),
  sessionId: z.string().max(255).optional(),
  referrer: z.string().optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
