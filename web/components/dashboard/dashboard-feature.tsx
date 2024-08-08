'use client';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

export default function DashboardFeature() {
  const { connection } = useConnection();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputPubkey = formData.get('sendAddress') as string;

    const suppliedPubkey = new PublicKey(inputPubkey);
    console.log('Send address recieved 📦');
  }

  return (
    <div>
      <form className="mt-52" onSubmit={handleSubmit}>
        <ul>
          <div>
            <label className="block text-3xl">Amount (in SOL) to send : </label>
            <input
              className="rounded-lg mt-2 p-1 w-full text-center"
              name="solamount"
            />
          </div>
          <div>
            <label className="block text-3xl mt-4">Send SOL to : </label>
            <input
              className="rounded-lg mt-2 p-1 w-full text-center"
              name="sendAddress"
            />
          </div>
          <button
            className="bg-white mt-4 p-2 rounded-lg w-full text-black font-medium"
            type="submit"
          >
            Send
          </button>
        </ul>
      </form>
    </div>
  );
}
