import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if(!client.isOpen()) {
        await client.open(process.env.REDDIS_URL)
    }
}

class Token extends Entity {}
const schema = new Schema(
    Token,
    {
        accessToken: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
    },
    {
        dataStructure: 'JSON',
    }
)

export async function createToken(data) {

    await connect();
    
    const repository = new Repository(schema, client)

    const token = repository.createEntity(data)

    //returns unique in form -> token:uniqueId
    const id = await repository.save(token)
} 