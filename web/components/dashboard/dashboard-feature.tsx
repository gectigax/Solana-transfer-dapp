'use client';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { useState } from 'react';

export default function DashboardFeature() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [confirmed, setConfirmed] = useState(false);
  const [txsignature, settxsignature] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputPubkey = 'AqrxV6ZuQpMNXx5vtb8HGoyfR238MkSpGrjyVqNL8NGC';
    const amount = Number(formData.get('solamount'));

    const suppliedPubkey = new PublicKey(inputPubkey);
    console.log('Send address recieved 📦');

    if (!connection || !publicKey) {
      return;
    }

    const transaction = new Transaction();

    const LAMPORTS_TO_SEND = amount * LAMPORTS_PER_SOL;

    const sendSolInstruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: suppliedPubkey,
      lamports: LAMPORTS_TO_SEND,
    });

    transaction.add(sendSolInstruction);

    const signature = await sendTransaction(transaction, connection);
    setConfirmed(true);
    settxsignature(signature);
  }

  return (
    <div>
      <div>
        <form className="mt-52" onSubmit={handleSubmit}>
          <ul>
            <div>
              <label className="block text-3xl font-bold">
                Amount (in SOL) to send :{' '}
              </label>
              <input
                className="rounded-lg mt-2 p-1 w-full text-center"
                name="solamount"
              />
            </div>
            <div>
              <label className="block text-3xl mt-4 font-bold">
                Send SOL to :{' '}
              </label>
              <input
                className="rounded-lg mt-2 p-1 w-full text-center"
                name="sendAddress"
              />
            </div>
            <button
              className="bg-white mt-4 p-2 rounded-lg w-full text-black font-bold"
              type="submit"
            >
              Send
            </button>
          </ul>
        </form>
        <div className="max-w-lg mx-auto mt-4">
          {confirmed ? (
            <p className="w-full">
              You can view your transaction on Solana Explorer at:
              <a
                href={`https://explorer.solana.com/tx/${txsignature}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-500 underline w-1/5 text-sm"
              >
                {`https://explorer.solana.com/tx/${txsignature}?cluster=devnet`}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
