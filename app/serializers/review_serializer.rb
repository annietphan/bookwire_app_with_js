class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :book_id, :user_id, :rating, :comment

  belongs_to :book
  belongs_to :user
end
