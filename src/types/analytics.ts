export type AnalyticsEventType =
  | 'entry_started'
  | 'entry_completed'
  | 'navigation_selected'
  | 'letter_form_viewed'
  | 'letter_signup_started'
  | 'letter_signup_completed'
  | 'quiz_started'
  | 'quiz_question_answered'
  | 'quiz_completed'
  | 'quiz_result_viewed'
  | 'quiz_result_shared'
  | 'track_played'
  | 'track_paused'
  | 'track_completed'
  | 'streaming_link_clicked'
  | 'video_played'
  | 'shop_viewed'
  | 'product_viewed'
  | 'add_to_cart'
  | 'checkout_started'
  | 'archive_era_entered'
  | 'profile_generator_opened'
  | 'profile_photo_uploaded'
  | 'profile_png_saved'
  | 'arzael_meme_pack_clicked'
  | 'house_of_zaelion_whatsapp_clicked'
  | 'house_of_zaelion_instagram_clicked';

export interface AnalyticsPayload {
  event: AnalyticsEventType;
  properties?: Record<string, string | number | boolean | undefined>;
  timestamp: number;
}
