# QUALITY_CHECK.md — Scripts de qualité par projet

Référence des commandes de qualité disponibles par projet.
À utiliser lors des audits automatiques ou sur demande.

## Projets et commandes disponibles

| Projet | Répertoire | Lint | Types | Format | Tests |
|---|---|---|---|---|---|
| budgetapp | `/projects/budgetapp` | `npm run lint` | `npm run check-types` | `npm run format` | — |
| enidpath | `/projects/enidpath` | `npm run lint` | — | — | — |
| ricardomboukou | `/projects/ricardomboukou` | `npm run lint` | — | — | — |
| noceflorale | `/projects/noceflorale` | — | — | — | — |
| quizflip | — | — | — | — | — |

## Procédure d'audit qualité

Pour chaque projet disposant de scripts :

1. `cd /projects/<nom>`
2. Vérifier que `node_modules` existe (`ls node_modules` ou `npm install` si absent)
3. Exécuter les commandes disponibles
4. Noter : ✅ propre / ⚠️ avertissements / ❌ erreurs bloquantes
5. Résumer dans un rapport concis

## Format de rapport

```
## Audit qualité — YYYY-MM-DD

| Projet | Lint | Types | Statut |
|---|---|---|---|
| budgetapp | ✅ | ✅ | Propre |
| enidpath | ⚠️ 3 warnings | — | À surveiller |
| ricardomboukou | ❌ 2 errors | — | Action requise |

### Actions prioritaires
- [projet] : [problème] → [action suggérée]
```
