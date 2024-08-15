require "test_helper"

class BuyerProfilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @buyer_profile = buyer_profiles(:one)
  end

  test "should get index" do
    get buyer_profiles_url, as: :json
    assert_response :success
  end

  test "should create buyer_profile" do
    assert_difference("BuyerProfile.count") do
      post buyer_profiles_url, params: { buyer_profile: { name: @buyer_profile.name, phone_number: @buyer_profile.phone_number, user_id: @buyer_profile.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show buyer_profile" do
    get buyer_profile_url(@buyer_profile), as: :json
    assert_response :success
  end

  test "should update buyer_profile" do
    patch buyer_profile_url(@buyer_profile), params: { buyer_profile: { name: @buyer_profile.name, phone_number: @buyer_profile.phone_number, user_id: @buyer_profile.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy buyer_profile" do
    assert_difference("BuyerProfile.count", -1) do
      delete buyer_profile_url(@buyer_profile), as: :json
    end

    assert_response :no_content
  end
end
