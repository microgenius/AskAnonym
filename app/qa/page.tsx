"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useState } from "react";

import Button from "@/src/components/common/button/Button";
import Input from "@/src/components/common/input/Input";
import { Database } from "@/supabase/database";

export default function QuestionsAnswers() {
  const supabase = useSupabaseClient<Database>();
  const [sessionName, setSessionName] = useState<string>("");
  async function createSession() {
    // @ts-ignore
    const { data } = await supabase.rpc("max_session_track_id", {});
    // @ts-ignore
    const maxSessionTrackId = parseInt(data) + 1;

    const { error } = await supabase.from("qa_sessions").insert({
      session_name: `${sessionName}`,
      session_track_id: String(maxSessionTrackId)
    });

    if (error) {
      alert("Error creating session");
    }

    window.location.href = `/qa/${maxSessionTrackId}`;
  }

  function joinSession() {
    window.location.href = `/qa/${sessionName}`;
  }

  function isSessionNameEmpty() {
    return sessionName.trim() === "";
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Questions and Answers</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Soru / Cevap</h1>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <div className="mt-6 w-96 rounded-xl border p-6 text-left">
            <Input
              label="Oturum ID"
              name="session_name"
              type={"text"}
              value={sessionName}
              onChange={e => setSessionName(e.target.value)}
              placeholder="Lutfen bir oturum ID giriniz"
              maxLength={50}
            />
            <div className="mt-4 flex items-center justify-center">
              <Button
                className="w-full"
                onClick={() => joinSession()}
                isDisabled={isSessionNameEmpty()}
              >
                Oturuma Katıl
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
