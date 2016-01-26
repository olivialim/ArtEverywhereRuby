class User < ActiveRecord::Base
  has_many :places
end

class Place <ActiveRecord::Base
  belongs_to :user
end