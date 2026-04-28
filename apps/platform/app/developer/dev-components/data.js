import { supabase } from '../../lib/supabaseClient';

export async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
}
export async function fetchAgents(userId) {
    console.log("fetchAgents userId:", userId);

  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('developed_by', userId)
    .order('created_at', { ascending: false });
    console.log("fetchAgents data:", data);
    console.log("fetchAgents error:", error);
  return { data, error };
}
export async function insertAgent(agentData) {
  const { data, error } = await supabase
    .from('agents')
    .insert([agentData])
    .select()
    .single();
  return { data, error };
}
export async function updateAgent(agentId, updates) {
  const { data, error } = await supabase
    .from('agents')
    .update(updates)
    .eq('id', agentId)
    .select()
    .single();
  return { data, error };
}