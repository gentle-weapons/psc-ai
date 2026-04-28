import BuilderProfile from "./BuilderProfile";
import { supabase } from '../../lib/supabaseClient';
import { notFound } from "next/navigation";

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