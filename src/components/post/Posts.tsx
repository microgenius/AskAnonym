"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";

import { questionToPostItem } from "@/src/components/post/mapper";
import { Database } from "@/supabase/database";
import { Question } from "@/supabase/models";

import Post from "./Post";
import { PostItem, PostStatus } from "./types";

interface PostsProps {
  initialPosts: PostItem[];
  variant: "home" | "profile";
  userId?: string;
  qaSessionId?: string;
  sessionUserId?: string;
}

function Posts({
  initialPosts,
  userId,
  qaSessionId,
  sessionUserId
}: PostsProps) {
  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const supabase = useSupabaseClient<Database>();

  async function deleteQuestion(questionId: string) {
    await supabase.from("answers").delete().eq("question_id", questionId);
    await supabase.from("questions").delete().eq("id", questionId);

    window.location.reload();
  }

  const tableFilter = `qa_session_id=eq.${qaSessionId}`;
  const newQuestionsSubscription = supabase
    .channel("table-filter-changes")
    .on<Question>(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "questions",
        filter: tableFilter
      },
      payload => {
        const newPost = questionToPostItem(payload.new);
        if (posts.filter(post => post.id === newPost.id).length > 0) {
          return;
        }

        setPosts([...posts, newPost]);
      }
    )
    .subscribe();

  useEffect(() => {
    return () => {
      newQuestionsSubscription.unsubscribe();
    };
  }, [newQuestionsSubscription]);

  return (
    <>
      <h1 className="sr-only">Recent questions</h1>

      <ul role="list" className="space-y-4">
        {posts
          .filter(w =>
            sessionUserId === userId ? true : w.status === PostStatus.Published
          )
          .map((post, id) => (
            <React.Fragment key={id}>
              <li className=" bg-white px-4  py-6 shadow dark:bg-slate-700 sm:rounded-lg sm:p-6">
                <Post item={post} onDelete={deleteQuestion} />
              </li>
            </React.Fragment>
          ))}
      </ul>
    </>
  );
}

export default Posts;
