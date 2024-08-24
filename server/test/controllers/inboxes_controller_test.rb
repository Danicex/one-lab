require "test_helper"

class InboxesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @inbox = inboxes(:one)
  end

  test "should get index" do
    get inboxes_url, as: :json
    assert_response :success
  end

  test "should create inbox" do
    assert_difference("Inbox.count") do
      post inboxes_url, params: { inbox: { content: @inbox.content } }, as: :json
    end

    assert_response :created
  end

  test "should show inbox" do
    get inbox_url(@inbox), as: :json
    assert_response :success
  end

  test "should update inbox" do
    patch inbox_url(@inbox), params: { inbox: { content: @inbox.content } }, as: :json
    assert_response :success
  end

  test "should destroy inbox" do
    assert_difference("Inbox.count", -1) do
      delete inbox_url(@inbox), as: :json
    end

    assert_response :no_content
  end
end
