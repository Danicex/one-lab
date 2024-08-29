Rails.application.routes.draw do
  resources :transactions do
    collection do
      get 'by_seller/:seller_id', to: 'transactions#by_seller'
      get 'by_product/:product_id', to: 'transactions#by_product'
    end
  end

  resources :products do
    collection do
      get 'all', to: 'products#all_products' 
      get 'category/:category', to: 'products#by_category', as: 'by_category' 
      get 'seller_product/:seller_id', to: 'products#by_seller', as: 'by_seller' 
      get 'search', to: 'products#search'
    end
  end

  devise_for :sellers
  devise_for :users
  
  resources :sellers do
    resource :profile
    resources :products, only: [:index, :show, :new, :create, :edit, :update, :destroy]
  end
  
  resources :users do
    resource :buyer_profile, only: [:index,  :show, :new, :create, :edit, :update, :destroy] 
    resources :transactions
  end

  resources :inboxes
  
  resources :comments   do
    collection do
      get  'by_seller/:seller_id', to: 'comments#by_seller', as: 'by_seller'
    end

  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
