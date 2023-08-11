import { notFound } from "next/navigation";

import AskQuestion from "@/src/components/AskQuestion";
import Loader from "@/src/components/common/loader/Loader";
import { questionToPost } from "@/src/components/post/mapper";
import Posts from "@/src/components/post/Posts";
import { PostItem } from "@/src/components/post/types";
import { Question } from "@/supabase/models";
import { questionQuery } from "@/supabase/queries";
import { createClient } from "@/utils/supabase/supabase-server";

export default async function UserProfile({
  params
}: {
  params: { session: string };
}) {
  let isLoading = true;
  const supabase = createClient();
  const sessionTrackId = params.session;

  const { data: qaSession, error } = await supabase
    .from("qa_sessions")
    .select("*")
    .eq("session_track_id", sessionTrackId)
    .single();

  if (!qaSession || error) {
    // eslint-disable-next-line no-console
    console.log(error);
    isLoading = false;
    notFound();
  }

  isLoading = false;

  const { data: draftQuestions } = await supabase
    .from("questions")
    .select(questionQuery)
    .eq("qa_session_id", qaSession?.id)
    .order("created_at", { ascending: true });

  const posts: PostItem[] = questionToPost(draftQuestions as Question[]);

  return (
    <>
      <div className="min-h-full ">
        {isLoading ? (
          <div className="flex h-screen flex-col items-center justify-center text-purple-600">
            Loading...
            <Loader color="rgb(126,34,206)" />
          </div>
        ) : (
          <main className="py-4 sm:py-12 lg:px-10">
            {/* Page header */}
            <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
              <h1
                className={
                  "inline-flex items-center justify-center py-4 text-4xl font-bold text-purple-700 dark:text-purple-400"
                }
              >
                {qaSession.session_name}
              </h1>
            </div>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
              <h4
                className={
                  "inline-flex items-center justify-center py-4 text-4xl font-bold text-purple-700 dark:text-purple-400"
                }
              >
                {qaSession.speaker_name}
              </h4>
            </div>
            <div className="mx-auto mt-8 max-w-3xl sm:px-6 lg:max-w-7xl">
              <div className="space-y-6">
                <AskQuestion qaSessionId={qaSession?.id} />

                {/* Comments*/}
                <section aria-labelledby="notes-title">
                  <div className="">
                    <Posts
                      variant="profile"
                      initialPosts={posts}
                      qaSessionId={qaSession?.id}
                      userId={"-1"}
                      sessionUserId={"-1"}
                    />
                  </div>
                </section>
              </div>
            </div>
          </main>
        )}
      </div>
    </>
  );
}
