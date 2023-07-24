import { PencilIcon } from "@heroicons/react/24/solid";
import Head from "next/head";

import Button from "@/src/components/common/button/Button";
import Input from "@/src/components/common/input/Input";

export default function QuestionsAnswers() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Questions and Answers</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Questions and Answers</h1>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <div className="mt-6 w-96 rounded-xl border p-6 text-left">
            <Input
              label="Session Name"
              name="session_name"
              type={"text"}
              placeholder="Enter Session Name"
              maxLength={50}
            />
            <div className="mt-4 flex justify-center items-center">
              <Button className="w-full">Create</Button>
              <p className="mx-4 text-gray-500">or</p>
              <Button className="w-full">Join</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
