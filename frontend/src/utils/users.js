import { AvatarGenerator } from 'random-avatar-generator';

export function generateAnimalName(){
  const username = "abc";
  return username;
}

export function generateAvatar(){
  const generator = new AvatarGenerator();
  const avatar = generator.generateRandomAvatar();
  return avatar;
}
