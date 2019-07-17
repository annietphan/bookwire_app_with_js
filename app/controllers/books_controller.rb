class BooksController < ApplicationController
  before_action :find_book, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:new, :edit]

  def index
    if params[:genre].blank?
      @books = Book.all.ordered
      respond_to do |f|
        f.html {render :index}
        f.json {render json: @books}
      end
    else
      # @genre_id = Genre.find_by(name: params[:genre]).id
      # @books = Book.where(genre_id: @genre_id).ordered
      @genre_id = Genre.find_by_name(params[:genre]).id
      @books = Book.by_genre(@genre_id).ordered
      # respond_to do |f|
      #   f.html {render :index}
      #   f.json {render json: @books}
      # end
    # else
    #   @books = Book.all.group_by(&:author)
    end
  end



  def show
    # @books = Book.all.ordered
    if @book.reviews.blank?
      @average_review = 0
    else
      @average_review = @book.reviews.average(:rating).round(2)
    end
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @book}
    end
  end

  def new
    @book = current_user.books.build
    @genres = Genre.all.map{ |g| [g.name, g.id] }
    # map_all_genres
  end

  def create
    @book = current_user.books.build(book_params)
    # @book.genre_id = params[:genre_id]
    set_genre
    if @book.save
      respond_to do |f|
        f.html {redirect_to root_path, notice: 'Book successfully created!'}
        f.json {render json: @book}
      end
    else
      render 'new'
    end
  end

  def edit
    # @genres = Genre.all.map{ |g| [g.name, g.id] }
    # map_all_genres
  end

  def update
    # @book.genre_id = params[:genre_id]
    set_genre
    if @book.update(book_params)
      respond_to do |f|
        f.html {redirect_to book_path(@book), notice: 'Book successfully updated!'}
        f.json {render json: @book}
      end
    else
      render 'edit'
    end
  end


  def destroy
    @book.destroy
    respond_to do |f|
      f.html {redirect_to root_path, notice: 'Book successfully deleted!'}
      f.json {head :no_content}
    end

  end

  def my_books
    @user_id = current_user.id
    # @books = Book.where(user_id: current_user.id).ordered
    @books = Book.my_books(@user_id).ordered
    respond_to do |f|
      f.html {render :my_books}
      f.json {render json: @books}
    end
  end

  private

  def book_params
    params.require(:book).permit(:title, :author, :summary, :genre_id, :book_image)
  end

  def find_book
    @book = Book.find(params[:id])
  end

  def set_genre
    @book.genre_id = params[:genre_id]
  end

  # def map_all_genres
  #   @genres = Genre.all.map{ |g| [g.name, g.id] }
  # end

end
