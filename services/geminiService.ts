
import { GoogleGenAI, Modality } from "@google/genai";
import { GANModel } from '../types';

const MODEL_PROMPTS: Record<GANModel, string> = {
  [GANModel.CodeFormer]: "Using the CodeFormer technique, restore this image, focusing on high-fidelity face restoration. Correct colors, remove scratches and artifacts, and enhance facial details naturally.",
  [GANModel.GFPGAN]: "Using the GFPGAN technique, restore this image with a focus on blind face restoration. Fix degradation and improve overall quality, especially on facial features.",
  [GANModel.ESRGAN]: "Using the ESRGAN (Enhanced Super-Resolution Generative Adversarial Networks) technique, restore and upscale this image. Focus on recovering and enhancing fine-grained details and textures to produce a high-resolution result.",
  [GANModel.RealESRGAN]: "Using the Real-ESRGAN technique, perform a general-purpose image restoration. This model is trained for real-world images, so handle various types of degradation like noise, blur, and compression artifacts effectively.",
  [GANModel.Upscale]: "Upscale this image to 4 times its original resolution. Preserve and enhance existing details meticulously without introducing artificial textures or artifacts. The final output should be a high-resolution version of the original.",
  [GANModel.ArtifactRemoval]: "Analyze this image for compression artifacts, such as blockiness, color banding, and ringing. Carefully remove these artifacts to produce a clean, smooth, and high-quality version of the image, restoring details lost during compression."
};

export async function restoreImage(
  base64ImageData: string,
  mimeType: string,
  model: GANModel
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const prompt = `You are an expert in digital image restoration. ${MODEL_PROMPTS[model]}`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64ImageData,
            mimeType: mimeType,
          },
        },
        {
          text: prompt,
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return part.inlineData.data;
    }
  }

  throw new Error("No image was returned from the API.");
}