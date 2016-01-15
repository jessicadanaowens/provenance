CarrierWave.configure do |config|
  config.storage = :fog

  config.fog_credentials = {
    provider:              'AWS',                        # required
    aws_access_key_id:     ENV["AWS_ACCESS_KEY_ID"],                        # required
    aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],                        # required
    :region => 'us-west-1'
  }
  config.fog_directory = "provenance-art-#{Rails.env}"
end