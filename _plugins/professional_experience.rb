require 'rubygems'
require 'pry'
require 'kramdown'

module Jekyll
  class ProfessionalExperience < Liquid::Tag
    def render(context)
      experience = context["page"]["user_experience"]
      experience.inject([]) do |array, exp|
        array << <<-EOF
          <div class="views-row #{"views-row-last" if exp == experience.last}">
            <div class="views-field views-field-field-professional-experience">
              <div class="field field-name-field-title field-type-text field-label-above">
                #{exp["title"]}
              </div>
              <div class="field field-name-field-years field-type-text field-label-above">
                #{exp["years"]}
              </div> 
              <div class="field field-name-field-description-experience field-type-text field-label-above">
                #{Kramdown::Document.new(exp["description"]).to_html}
              </div>
            </div>
          </div>
        EOF
      end.join(" ")
    end
  end
end

Liquid::Template.register_tag('professional_experience', Jekyll::ProfessionalExperience)
