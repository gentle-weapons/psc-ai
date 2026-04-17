import BuilderProfile from "./BuilderProfile";
import { createClient } from "@supabase/supabase-js"
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function BuilderPage({ params }) {
  const { username } = await params;

const { data: builder, error } = await supabase
  .from("profiles")
  .select(`*, agents (*, reviews (*, reviewer:profiles!review_by ( username ), metrics (*)))`)
  .eq("username", username)
  .single();

  if (error || !builder) {
    notFound();
  }

  return <BuilderProfile builder={builder} />;
}