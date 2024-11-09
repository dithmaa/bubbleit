import supabase from "../services/supabase";
export async function fetchUsers() {
  const { data } = await supabase.from("users").select("*");
  return data;
}
