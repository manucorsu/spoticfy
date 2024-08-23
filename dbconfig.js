
// export POSTGRES_HOST=ep-blue-feather-a4ve7rp2.us-east-1.aws.neon 
// export POSTGRES_USER=default
// export POSTGRES_PASSWORD=xxxxx
// 
export const config = {
    host :process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    user:process.env.POSTGRES_USER,
    password:process.env.POSTGRES_PASSWORD,
    port:5432,
    ssl: true
}
