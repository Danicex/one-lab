require "test_helper"

class ProfilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @profile = profiles(:one)
  end

  test "should get index" do
    get profiles_url, as: :json
    assert_response :success
  end

  test "should create profile" do
    assert_difference("Profile.count") do
      post profiles_url, params: { profile: { account_number: @profile.account_number, address: @profile.address, bank_code: @profile.bank_code, bank_name: @profile.bank_name, currency: @profile.currency, fullname: @profile.fullname, phone_number: @profile.phone_number, seller_id: @profile.seller_id } }, as: :json
    end

    assert_response :created
  end

  test "should show profile" do
    get profile_url(@profile), as: :json
    assert_response :success
  end

  test "should update profile" do
    patch profile_url(@profile), params: { profile: { account_number: @profile.account_number, address: @profile.address, bank_code: @profile.bank_code, bank_name: @profile.bank_name, currency: @profile.currency, fullname: @profile.fullname, phone_number: @profile.phone_number, seller_id: @profile.seller_id } }, as: :json
    assert_response :success
  end

  test "should destroy profile" do
    assert_difference("Profile.count", -1) do
      delete profile_url(@profile), as: :json
    end

    assert_response :no_content
  end
end
