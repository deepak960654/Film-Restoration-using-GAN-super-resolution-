
import { GANModel } from './types';

interface ModelOption {
  id: GANModel;
  name: string;
  description: string;
}

export const MODELS: ModelOption[] = [
  {
    id: GANModel.CodeFormer,
    name: 'CodeFormer',
    description: 'Best for faces and portraits.',
  },
  {
    id: GANModel.GFPGAN,
    name: 'GFPGAN',
    description: 'Good for general face restoration.',
  },
  {
    id: GANModel.ESRGAN,
    name: 'ESRGAN',
    description: 'Focuses on enhancing fine details.',
  },
  {
    id: GANModel.RealESRGAN,
    name: 'Real-ESRGAN',
    description: 'Aims for realistic, general-purpose enhancement.',
  },
  {
    id: GANModel.Upscale,
    name: 'Upscale (4x)',
    description: 'Increases image resolution by 4 times.',
  },
  {
    id: GANModel.ArtifactRemoval,
    name: 'Artifact Removal',
    description: 'Cleans up compression artifacts (e.g., JPEG).',
  },
];