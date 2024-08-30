import randomAnimalName from 'random-animal-name';
import { AvatarGenerator } from 'random-avatar-generator';

export function generateAnimalName(){
  const username = randomAnimalName();
  return username;
}

export function generateAvatar(){
  const generator = new AvatarGenerator();
  const avatar = generator.generateRandomAvatar();
  return avatar;
}