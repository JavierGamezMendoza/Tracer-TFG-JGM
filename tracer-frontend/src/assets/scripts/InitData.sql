-- Inserción de datos en la tabla user

use tracer;

INSERT INTO user (id, reliable, email, username, bio, password, profile_pic, role)
VALUES 
(1, TRUE, 'bob.johnson@example.com', 'bob.johnson', 'Enthusiastic software developer.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', 'ADMIN'),
(2, TRUE, 'frank.miller@example.com', 'frank.miller', 'Passionate about open source.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', 'ADMIN'),
(3, TRUE, 'alice.smith@example.com', 'alice.smith', 'Love exploring new technologies.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', 'ADMIN'),
(4, TRUE, 'carol.jones@example.com', 'carol.jones', 'UI/UX designer and coffee lover.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', 'ADMIN'),
(5, TRUE, 'david.brown@example.com', 'david.brown', 'Backend engineer.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg', 'ADMIN'),
(6, TRUE, 'emma.wilson@example.com', 'emma.wilson', 'Full stack developer.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/462680/pexels-photo-462680.jpeg', 'USER'),
(7, TRUE, 'george.moore@example.com', 'george.moore', 'DevOps specialist.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg', 'USER'),
(8, FALSE, 'hannah.lee@example.com', 'hannah.lee', 'Machine learning enthusiast.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg', 'USER'),
(9, FALSE, 'ian.taylor@example.com', 'ian.taylor', 'Cloud computing expert.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', 'USER'),
(10, FALSE, 'jane.williams@example.com', 'jane.williams', 'Data scientist.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg', 'USER'),
(11, FALSE, 'kyle.thomas@example.com', 'kyle.thomas', 'Cybersecurity analyst.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', 'USER'),
(12, FALSE, 'linda.jones@example.com', 'linda.jones', 'Blockchain developer.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg', 'USER'),
(13, FALSE, 'mike.brown@example.com', 'mike.brown', 'Game developer.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', 'USER'),
(14, FALSE, 'nancy.davis@example.com', 'nancy.davis', 'Digital marketer.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', 'USER'),
(15, FALSE, 'oliver.white@example.com', 'oliver.white', 'SEO specialist.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', 'USER'),
(16, FALSE, 'patricia.harris@example.com', 'patricia.harris', 'Content writer.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/462680/pexels-photo-462680.jpeg', 'USER'),
(17, FALSE, 'quinn.jones@example.com', 'quinn.jones', 'Graphic designer.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg', 'USER'),
(18, FALSE, 'ryan.jackson@example.com', 'ryan.jackson', 'Project manager.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg', 'USER'),
(19, FALSE, 'sarah.martin@example.com', 'sarah.martin', 'Business analyst.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', 'USER'),
(20, FALSE, 'tommy.walker@example.com', 'tommy.walker', 'Scrum master.', '$2a$10$gIa2vZhSNkZF/RRjVho6Ve5gYtmspJ69aDi11qd6eKlAXURqISR26', 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg', 'USER');

-- Inserción de datos en la tabla vehicle
INSERT INTO vehicle (id, creation_date, brand, model)
VALUES 
(1, '2023-01-01', 'Toyota', 'Corolla'),
(2, '2023-02-01', 'Honda', 'Civic'),
(3, '2023-03-01', 'Ford', 'Focus'),
(4, '2023-04-01', 'Chevrolet', 'Malibu'),
(5, '2023-05-01', 'Nissan', 'Altima'),
(6, '2023-06-01', 'Hyundai', 'Elantra'),
(7, '2023-07-01', 'Kia', 'Optima'),
(8, '2023-08-01', 'Volkswagen', 'Jetta'),
(9, '2023-09-01', 'Subaru', 'Impreza'),
(10, '2023-10-01', 'Mazda', 'Mazda3'),
(11, '2023-11-01', 'BMW', '3 Series'),
(12, '2023-12-01', 'Mercedes-Benz', 'C-Class'),
(13, '2023-01-15', 'Audi', 'A4'),
(14, '2023-02-15', 'Lexus', 'IS'),
(15, '2023-03-15', 'Acura', 'TLX'),
(16, '2023-04-15', 'Infiniti', 'Q50'),
(17, '2023-05-15', 'Cadillac', 'CT5'),
(18, '2023-06-15', 'Genesis', 'G70'),
(19, '2023-07-15', 'Jaguar', 'XE'),
(20, '2023-08-15', 'Tesla', 'Model 3');

-- Inserción de datos en la tabla thread
INSERT INTO thread (id, close_date, creation_date, creator_id, vehicle_id, title, message)
VALUES 
(1, NULL, '2023-06-01', 1, 1, 'Issues with Toyota Corolla', 'Experiencing some engine problems.'),
(2, NULL, '2023-06-02', 2, 2, 'Honda Civic performance', 'What do you think about the new Civic?'),
(3, NULL, '2023-06-03', 3, 3, 'Ford Focus maintenance tips', 'Looking for maintenance advice.'),
(4, NULL, '2023-06-04', 4, 4, 'Chevrolet Malibu reviews', 'Is the Malibu a reliable car?'),
(5, NULL, '2023-06-05', 5, 5, 'Nissan Altima vs competitors', 'How does Altima compare to other sedans?'),
(6, NULL, '2023-06-06', 6, 6, 'Hyundai Elantra features', 'What are the best features of Elantra?'),
(7, NULL, '2023-06-07', 7, 7, 'Kia Optima fuel efficiency', 'Is Optima fuel efficient?'),
(8, NULL, '2023-06-08', 8, 8, 'Volkswagen Jetta parts', 'Where to buy affordable parts?'),
(9, NULL, '2023-06-09', 9, 9, 'Subaru Impreza AWD system', 'How does the AWD perform?'),
(10, NULL, '2023-06-10', 10, 10, 'Mazda Mazda3 experience', 'Share your experiences with Mazda3.'),
(11, NULL, '2023-06-11', 11, 11, 'BMW 3 Series luxury', 'Is it worth the price?'),
(12, NULL, '2023-06-12', 12, 12, 'Mercedes-Benz C-Class reliability', 'Is the C-Class reliable?'),
(13, NULL, '2023-06-13', 13, 13, 'Audi A4 tech features', 'What are the best tech features?'),
(14, NULL, '2023-06-14', 14, 14, 'Lexus IS vs BMW 3 Series', 'Which one is better?'),
(15, NULL, '2023-06-15', 15, 15, 'Acura TLX handling', 'How is the handling?'),
(16, NULL, '2023-06-16', 16, 16, 'Infiniti Q50 performance', 'Is the Q50 a good performer?'),
(17, NULL, '2023-06-17', 17, 17, 'Cadillac CT5 luxury', 'What makes CT5 luxurious?'),
(18, NULL, '2023-06-18', 18, 18, 'Genesis G70 design', 'How is the design of G70?'),
(19, NULL, '2023-06-19', 19, 19, 'Jaguar XE comfort', 'Is the XE comfortable?'),
(20, NULL, '2023-06-20', 20, 20, 'Tesla Model 3 range', 'How far can Model 3 go on a charge?');

-- Inserción de datos en la tabla threadpost
INSERT INTO threadpost (id, creation_date, thread_id, user_id, message)
VALUES 
(1, '2023-06-01', 1, 1, 'I had a similar issue with my Corolla.'),
(2, '2023-06-02', 1, 2, 'Did you check the oil level?'),
(3, '2023-06-03', 2, 3, 'I love the new Civic, very sporty!'),
(4, '2023-06-04', 2, 4, 'I prefer the old model.'),
(5, '2023-06-05', 3, 5, 'Make sure to change the oil regularly.'),
(6, '2023-06-06', 3, 6, 'I recommend using synthetic oil.'),
(7, '2023-06-07', 4, 7, 'Malibu is very reliable in my experience.'),
(8, '2023-06-08', 4, 8, 'I had some issues with the transmission.'),
(9, '2023-06-09', 5, 9, 'Altima is great but check out the Accord.'),
(10, '2023-06-10', 5, 10, 'I think Camry is a better choice.'),
(11, '2023-06-11', 6, 11, 'Elantra has a lot of great features.'),
(12, '2023-06-12', 6, 12, 'I love the interior design of Elantra.'),
(13, '2023-06-13', 7, 13, 'Optima is very fuel efficient.'),
(14, '2023-06-14', 7, 14, 'I get great mileage with my Optima.'),
(15, '2023-06-15', 8, 15, 'Try looking on eBay for parts.'),
(16, '2023-06-16', 8, 16, 'I found affordable parts on Amazon.'),
(17, '2023-06-17', 9, 17, 'AWD system is excellent in snow.'),
(18, '2023-06-18', 9, 18, 'Impreza handles great in all weather.'),
(19, '2023-06-19', 10, 19, 'Mazda3 is a fantastic car.'),
(20, '2023-06-20', 10, 20, 'I had a great experience with my Mazda3.');

-- Inserción de datos en la tabla ticket
INSERT INTO ticket (id, close_date, creation_date, creator_id, infractor_id, thread_id, message)
VALUES 
(1, NULL, '2023-06-01', 1, 2, 1, 'User was spamming the thread.'),
(2, NULL, '2023-06-02', 2, 3, 2, 'Offensive language used.'),
(3, NULL, '2023-06-03', 3, 4, 3, 'Thread was hijacked.'),
(4, NULL, '2023-06-04', 4, 5, 4, 'User was trolling.'),
(5, NULL, '2023-06-05', 5, 6, 5, 'Spam links posted.'),
(6, NULL, '2023-06-06', 6, 7, 6, 'Off-topic posts.'),
(7, NULL, '2023-06-07', 7, 8, 7, 'Harassment reported.'),
(8, NULL, '2023-06-08', 8, 9, 8, 'Duplicate threads.'),
(9, NULL, '2023-06-09', 9, 10, 9, 'Abusive behavior.'),
(10, NULL, '2023-06-10', 10, 11, 10, 'False information shared.'),
(11, NULL, '2023-06-11', 11, 12, 11, 'Offensive comments.'),
(12, NULL, '2023-06-12', 12, 13, 12, 'Multiple accounts.'),
(13, NULL, '2023-06-13', 13, 14, 13, 'Personal attacks.'),
(14, NULL, '2023-06-14', 14, 15, 14, 'Impersonation.'),
(15, NULL, '2023-06-15', 15, 16, 15, 'Misleading content.'),
(16, NULL, '2023-06-16', 16, 17, 16, 'Copyright infringement.'),
(17, NULL, '2023-06-17', 17, 18, 17, 'Phishing attempt.'),
(18, NULL, '2023-06-18', 18, 19, 18, 'Inappropriate content.'),
(19, NULL, '2023-06-19', 19, 20, 19, 'User was banned.'),
(20, NULL, '2023-06-20', 20, 1, 20, 'User was warned.');

-- Inserción de datos en la tabla user_block_user
INSERT INTO user_block_user (blocked_id, blocker_id)
VALUES 
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 10),
(10, 11),
(11, 12),
(12, 13),
(13, 14),
(14, 15),
(15, 16),
(16, 17),
(17, 18),
(18, 19),
(19, 20),
(20, 1);

-- Inserción de datos en la tabla user_user
INSERT INTO user_user (follower_id, followed_id)
VALUES 
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 10),
(10, 11),
(11, 12),
(12, 13),
(13, 14),
(14, 15),
(15, 16),
(16, 17),
(17, 18),
(18, 19),
(19, 20),
(20, 1);

-- Inserción de datos en la tabla user_thread
INSERT INTO user_thread (user_id, thread_id)
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20);

-- Inserción de datos en la tabla user_vehicle
INSERT INTO user_vehicle (user_id, vehicle_id)
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20);
