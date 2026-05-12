import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasourceUrl: "postgresql://postgres:mysecretpassword@localhost:5432/budget_db?schema=public",
})

async function getTransactions() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        user: true, // Inclut les infos de l'utilisateur lié (Relation 1:n)
      },
      orderBy: {
        date: 'desc', // Les plus récentes en premier
      },
    })

    console.log('--- Liste des Transactions ---')
    console.table(transactions.map(t => ({
      ID: t.id.substring(0, 8),
      Label: t.label,
      Montant: `${t.amount} ${t.currency}`,
      Catégorie: t.category,
      Utilisateur: t.user.name || t.user.email
    })))
  } catch (error) {
    console.error('Erreur lors de la récupération :', error)
  } finally {
    await prisma.$disconnect()
  }
}

getTransactions()
