# Generates user page with the user's info and posts

require "pry"

module Jekyll

  class UserPageGenerator < Generator
    safe true

    def generate(site)
      site.data["users"].each do |user_data|
        paginate(site, user_data)
      end
    end

    def paginate(site, user)
      author = user["login"]
      puts "Generating user page for: #{author}"
      posts_by_author = site.posts.find_all {|post| post.data["author"] == author}.sort_by {|post| -post.date.to_f}
      posts_by_author.each do |post|
        post.data["user"] = user
      end
      dir_name = user["permalink"] ? user["permalink"] : "/users/#{author}"
      num_pages = Pager.calculate_pages(posts_by_author, site.config['paginate'].to_i)

      if num_pages == 0
        # create a pagination object containing page number,
        # previous page, next page etc
        # pager = Pager.new(site, page, posts_by_author, num_pages)

        # setup the page directory. If this is the first page it will
        # be saved inside the group's folder (for example
        # "/java/index.html"). Otherwise, it will be saved inside a
        # numbered subfolder ("java/page2/index.html")

        # creates the page (index.html)
        page = UserPage.new(site, site.source, dir_name, user, dir_name)

        # adds pagination data to page
        # page.pager = pager

        site.pages << page
      else
        (1..num_pages).each do |page|
          # create a pagination object containing page number,
          # previous page, next page etc
          pager = Pager.new(site, page, posts_by_author, num_pages)

          # setup the page directory. If this is the first page it will
          # be saved inside the group's folder (for example
          # "/java/index.html"). Otherwise, it will be saved inside a
          # numbered subfolder ("java/page2/index.html")
          dir = File.join(dir_name, page > 1 ? "page#{page}" : '')

          # creates the page (index.html)
          page = UserPage.new(site, site.source, dir, user, dir_name)

          # adds pagination data to page
          page.pager = pager

          site.pages << page
        end
      end
    end
    
    class UserPage < Page
      def initialize(site, base, dir, user, dir_name)
        @site = site
        @base = base
        @dir = dir
        @name = 'index.html'

        puts "User page for: #{dir_name}"

        self.process(@name)

        # use the user layout
        self.read_yaml(File.join(base, '_layouts'), 'user.html')

        # add the ueser's data to the page data, so it can be accessed in
        # views using {{ page.user_first_name }} etc
        user.each do |k, v|
          self.data["user_#{k}"] = v
        end

        self.data["dir_name"] = dir_name
      end
    end
  end
end
