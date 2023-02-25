## Getting Started

### Next.js を立ち上げる

npm run dev

## Prisma

### DB スキーマを SQLite に反映させるコマンド

npx prisma db push

### seeder を実行するコマンド

npx prisma db seed

### Prisma Studio（GUI）を開くコマンド

npx prisma studio

### DB を再作成し、seed を実行する

npx prisma migrate reset  
npx prisma db push  
npx prisma db seed  
