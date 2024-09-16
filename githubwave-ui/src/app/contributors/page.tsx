/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './page.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface Contributor {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  image: string;
}

const contributors: Contributor[] = [
  {
    name: 'Diego Lucas',
    email: 'lukasxdp@gmail.com',
    github: 'https://github.com/diegoandcontroll',
    linkedin: 'https://www.linkedin.com/in/diego-lucas-293682181/',
    image: 'https://lh3.googleusercontent.com/a/AEdFTp6KMb0sysV9tcS694sVNPlmkj0EsW8fpWlJ6QtLsQ=s96-c'
  },
  {
    name: 'Marcelo Ferreira',
    email: 'marcelojacintoferreirq@gmail.com',
    github: 'https://github.com/marcelojacint',
    linkedin: 'https://www.linkedin.com/in/marcelo-ferreiraa/',
    image: 'https://avatars.githubusercontent.com/u/150560620?v=4'
  },
  {
    name: 'Camonn Ritse',
    email: 'camonnritse18@gmail.com',
    github: 'https://github.com/camonn',
    linkedin: 'https://www.linkedin.com/in/camonn-ritse-092847270/',
    image: 'https://avatars.githubusercontent.com/u/129463803?v=4'
  },
  {
    name: 'Marcos Vinícius',
    email: 'marcosviniciuscpanta@gmail.com',
    github: 'https://github.com/marcvinius',
    linkedin: 'https://www.linkedin.com/in/mvcp163641163?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    image: 'https://avatars.githubusercontent.com/u/180128150?v=4'
  },
  {
    name: 'Edvaldo Neto',
    email: 'edvaldorangel7@gmail.com',
    github: 'https://github.com/EdvaldoR7',
    linkedin: 'https://www.linkedin.com/in/edvaldo-rangel-32093b326',
    image: 'https://avatars.githubusercontent.com/u/180125653?v=4'
  }
];

const Contributors: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contribuidores do GitWave</h1>
      <div className={styles.slider}>
        {contributors.map((contributor, index) => (
          <div key={index} className={styles.card}>
            <img src={contributor.image} alt={contributor.name} className={styles.image} />
            <h2 className={styles.name}>{contributor.name}</h2>
            <p className={styles.email}>{contributor.email}</p>
            <div className={styles.links}>
              <a href={contributor.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <FaGithub className={styles.icon} /> GitHub
              </a>
              <a href={contributor.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <FaLinkedin className={styles.icon} /> LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.info}>
        <h2>Sobre o GitWave</h2>
        <p>
          GitWave é uma ferramenta desenvolvida para a disciplina de Tópicos Essenciais de Programação da Uniesp, coordenada pelo professor 
          <a href="https://www.linkedin.com/in/wuldsonfranco/" target="_blank" rel="noopener noreferrer"> Wuldson Franco</a>. 
          O projeto visa fornecer uma interface dinâmica para explorar repositórios e usuários do GitHub, combinando funcionalidades com um design moderno e atraente.
        </p>
      </div>
    </div>
  );
};

export default Contributors;
