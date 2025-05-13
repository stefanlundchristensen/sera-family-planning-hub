import { supabase } from '../integrations/supabase/client';

/**
 * Uploads an avatar image to Supabase storage
 * @param file The file to upload
 * @param userId The user ID to associate with the file
 * @returns The public URL of the uploaded file or null if upload failed
 */
export async function uploadAvatar(file: File, userId: string): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error } = await supabase.storage.from('avatars').upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

    if (error) {
      console.error('Error uploading avatar:', error);
      return null;
    }

    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadAvatar:', error);
    return null;
  }
}
