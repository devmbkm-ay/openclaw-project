// prisma/seed.ts
import 'dotenv/config'; // Ensures .env file is read
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Create connection to PostgreSQL using pg Pool
const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
});

// Create an instance of the Prisma adapter for PostgreSQL
const adapter = new PrismaPg(pool);

//Pass the adapter to PrismaClient constructor
const prisma = new PrismaClient({adapter});

// Your updated project data
const projects = [
 {
   title: 'Enidpath',
   description: 'A modern web application. Please update this description.',
   technologies: ['Next.js', 'TypeScript', 'Vercel'], // Please adjust technologies
   imageUrl: '/images/enidpath.png', // Placeholder image
   githubUrl: 'https://github.com/devmbkm-ay/enidpath',
   projectUrl: 'https://enidpath.vercel.app',
 },
 {
   title: 'Quizflip',
   description: 'An interactive quiz platform. Please update this description.',
   technologies: ['React', 'Vercel'], // Please adjust technologies
   imageUrl: '/images/quizflip.png', // Placeholder image
   githubUrl: '', // Not provided
   projectUrl: 'https://quizflip-97xgh5zcs-devmbkm-ays-projects.vercel.app',
 },
 {
   title: 'Noce Florale',
   description: 'An elegant website for a floral service. Please update this description.',
   technologies: ['HTML', 'CSS', 'JavaScript'], // Please adjust technologies
   imageUrl: '/images/noceflorale.png', // Placeholder image
   githubUrl: 'https://github.com/devmbk-ay/noceflorale',
   projectUrl: 'https://noceflorale.vercel.app',
 }
];

async function main() {
 console.log(`Start seeding ...`);

 for (const projectData of projects) {
    const project = await prisma.project.upsert({
        where: { title: projectData.title }, // Assumes title is unique
        update: projectData,
        create: projectData,
    });
    console.log(`Upserted project "${project.title}" with id: ${project.id}`);
 }

 console.log(`Seeding finished.`);
}

main()
 .catch((e) => {
   console.error(e);
   process.exit(1);
 })
 .finally(async () => {
   await prisma.$disconnect();
 });
