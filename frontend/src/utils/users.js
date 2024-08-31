import { AvatarGenerator } from 'random-avatar-generator';
import { v4 as uuidv4 } from 'uuid';

export function generateAnimalName(){
  const username = uuidv4();
  return username;
}

export function generateAvatar(){
  const generator = new AvatarGenerator();
  const avatar = generator.generateRandomAvatar();
  return avatar;
}
