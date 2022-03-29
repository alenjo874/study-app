puts "🌱 Seeding project..."

puts "🌱 Creating study sessions..."
10.times do

StudySession.create(title:Faker::Educator.course_name, session_overview:Faker::Lorem.sentence(word_count: 15), session_date:Faker::Date.between(from: '2021-09-23', to: '2022-09-25'))

end

puts "🌱 Creating users..."
3.times do

User.create(name: Faker::Name.name )

end

puts "🌱 Creating notes..."
20.times do

Note.create(subject: Faker::Educator.subject, study_note: Faker::Quote.famous_last_words, user_id: User.all.sample.id, study_session_id: StudySession.all.sample.id)

end

puts "🌱 Creating user sessions..."
20.times do

UserSession.create(user_id: User.all.sample.id, study_session_id: StudySession.all.sample.id)

end

puts "🌱 Creating todo list..."
10.times do

TodoList.create(task:Faker::Lorem.sentence(word_count: 10), completed: false, user_id:User.all.sample.id )

end


puts "✅ Done seeding!"