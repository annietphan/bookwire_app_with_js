class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :summary, :user_id, :genre_id, :book_image

  belongs_to :user
  belongs_to :genre
  has_many :reviews
end
