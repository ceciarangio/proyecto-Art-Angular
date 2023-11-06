import { artistasI } from './artista.model';
export interface obraI{
  id: number,
  name: string,
  date: any,
  description: string,
  image: string,
  artistId?: any,
  artist: string,
  likes: number,
  comments?: string[]
}