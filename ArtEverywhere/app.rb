require 'sinatra'
require 'sinatra/activerecord'

set :sessions, true

set :database, "sqlite3:artdatabase.sqlite3"

require './models'

get '/home' do
  @users = User.all
  @pics = Place.all
  erb :index
end

get '/upload' do
  @user = current_user
  if @user
    @pics = Place.where(user_id: @user.id)
    erb :upload
  else
    erb :login
  end 
end

get '/logout' do
  session.clear
  redirect '/login'
end

post "/upload" do 
  @user= current_user
  
  File.open('public/' + params[:myfile][:filename], "w") do |f|
    f.write(params[:myfile][:tempfile].read)
  end

  Place.create(image_url: params[:myfile][:filename], neighborhood: params[:neighborhood], citystate: params[:citystate], artist: params[:artist], title: params[:title], description: params[:description], user_id: @user.id)
  @pic = 'public/' + params[:myfile][:filename]

  redirect "/upload"
  return "The file was successfully uploaded!"

end

get '/login' do
  if @user = current_user
    redirect "/profile"
  else
    erb :login
  end
end

post '/login' do
  @user = User.where(username: params[:username]).first
  if @user && @user.password == params[:password]
    session[:user_id] = @user.id
    @pics = Place.where(user_id: @user.id)
    erb :profile
  else
    redirect '/login'
  end
end

get '/user' do
  @user = current_user
  if @user
    erb :profile
  else
    erb :index
  end
end

def current_user
  if session[:user_id]
    @current_user = User.find(session[:user_id])
  end
end

get '/signup' do
  erb :signup
end

post '/signup' do
  User.create(fname: params[:fname], lname: params[:lname], username: params[:username], password: params[:password], email: params[:email])
  redirect '/login'
end

get '/profile' do
  @user = current_user
  if @user
    @pics = Place.where(user_id: @user.id)
    erb :profile
  else
    erb :login
  end 
end

get '/map' do
  erb :map
end

get '/gallery' do
  @pics = Place.all
  erb :gallery
end

post '/neighborhood' do
  @pics = Place.where(neighborhood: params[:neighborhood])
  erb :neighborhood
end

