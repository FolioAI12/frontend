import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Returns null when env vars are missing (build time / unconfigured)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as ReturnType<typeof createClient>;

export interface SavedPortfolio {
  id: string;
  user_id: string;
  user_email: string;
  name: string;
  template: string;
  html: string;
  portfolio_data: object;
  created_at: string;
}

export async function savePortfolio(
  userId: string,
  userEmail: string,
  name: string,
  template: string,
  html: string,
  portfolioData: object
): Promise<SavedPortfolio | null> {
  if (!supabase) { console.warn('Supabase not configured'); return null; }
  const { data, error } = await supabase
    .from('portfolios')
    .insert({
      user_id: userId,
      user_email: userEmail,
      name,
      template,
      html,
      portfolio_data: portfolioData,
    })
    .select()
    .single();

  if (error) {
    console.error('Supabase save error:', error);
    return null;
  }
  return data;
}

export async function getUserPortfolios(userId: string): Promise<SavedPortfolio[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch error:', error);
    return [];
  }
  return data || [];
}

export async function deletePortfolio(id: string): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('portfolios').delete().eq('id', id);
  return !error;
}
