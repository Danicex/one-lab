class InboxesController < ApplicationController
  before_action :set_inbox, only: %i[ show update destroy ]

  # GET /inboxes
  def index
    @inboxes = Inbox.all

    render json: @inboxes
  end

  # GET /inboxes/1
  def show
    render json: @inbox
  end

  # POST /inboxes
  def create
    @inbox = Inbox.new(inbox_params)

    if @inbox.save
      render json: @inbox, status: :created, location: @inbox
    else
      render json: @inbox.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /inboxes/1
  def update
    if @inbox.update(inbox_params)
      render json: @inbox
    else
      render json: @inbox.errors, status: :unprocessable_entity
    end
  end

  # DELETE /inboxes/1
  def destroy
    @inbox.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_inbox
      @inbox = Inbox.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def inbox_params
      params.require(:inbox).permit(:content)
    end
end
