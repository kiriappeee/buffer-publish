module.exports = userData => ({
  id: userData.id,
  email: userData.email,
  features: userData.features,
  hasTwentyFourHourTimeFormat: userData.twentyfour_hour_time,
  imageDimensionsKey: userData.imagedimensions_key,
  is_business_user: ( // Same logic as user_model.php#onBusinessPlan()
    userData.features.includes('improved_analytics') ||
    (userData.plan_code >= 10 && userData.plan_code <= 19)
  ),
  is_free_user: userData.plan === 'free',
  messages: userData.messages || [],
  new_contributions_emails_subscribe_link: userData.new_contributions_emails_subscribe_link,
  skip_empty_text_alert: userData.messages.includes('remember_confirm_saving_modal'),
  profile_groups: userData.profile_groups || [],
  s3_upload_signature: userData.s3_upload_signature,
  uses_24h_time: userData.twentyfour_hour_time,
  week_starts_monday: userData.week_starts_monday,
  has_ig_direct_flip: userData.features.includes('instagram_direct_posting'),
  twofactor: userData.twofactor,
  has_simplified_free_plan_ux: userData.features.includes('has_simplified_free_plan_ux'),
  hasIGLocationTaggingFeature: userData.features.includes('instagram-location-tagging'),
});
