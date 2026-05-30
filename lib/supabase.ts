import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface SavedPortfolio {
  id: string;
  user_id: string;
  user_email: string;
  name: string;
  template: string;
  thumbnail_color: string;
  html: string;
  portfolio_data: object;
  created_at: string;
}

export async function savePortfolio(
  userId: string,
  userEmail: string,
  name: string,
  template: string,
  primaryColor: string,
  html: string,
  portfolioData: object
): Promise<{ data: SavedPortfolio | null; error: string | null }> {
  if (!supabase) return { data: null, error: 'Supabase not configured — add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local' };

  const { data, error } = await supabase
    .from('portfolios')
    .insert({
      user_id: userId,
      user_email: userEmail,
      name,
      template,
      thumbnail_color: primaryColor,
      html,
      portfolio_data: portfolioData,
    })
    .select('id, user_id, user_email, name, template, thumbnail_color, created_at, portfolio_data')
    .single();

  if (error) {
    console.error('Supabase save error:', error);
    return { data: null, error: error.message };
  }
  return { data: { ...data, html } as SavedPortfolio, error: null };
}

export async function getUserPortfolios(userId: string): Promise<SavedPortfolio[]> {
  if (!supabase) return [];

  // Fetch everything EXCEPT html for the list view (html can be huge)
  const { data, error } = await supabase
    .from('portfolios')
    .select('id, user_id, user_email, name, template, thumbnail_color, created_at, portfolio_data')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) { console.error('Supabase fetch error:', error); return []; }
  return (data || []) as SavedPortfolio[];
}

export async function getPortfolioHTML(id: string): Promise<string | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('portfolios')
    .select('html')
    .eq('id', id)
    .single();
  if (error) { console.error('Fetch HTML error:', error); return null; }
  return data?.html ?? null;
}

export async function deletePortfolio(id: string): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('portfolios').delete().eq('id', id);
  if (error) { console.error('Delete error:', error); return false; }
  return true;
}
