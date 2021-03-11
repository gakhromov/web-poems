<template>
	<div class="container">
		<h2 data-aos="fade" class="text-center" style="margin-bottom: 80px">Добро пожаловать на Web Poems <span style="color: red">live</span>!</h2>
		<div class="row content-block justify-content-center">
			<div data-aos="zoom-in" class="col-xl-8 col-lg-8 col-md-12 col-sm-12 text-center"><p>
				Данный сайт посвящен 📕 <b>стихотворениям</b> 📕. <br>
				И 🤖 <b>нейросетям</b> 🧠. <br>
				Необычно, правда?</p>
			</div>
			<div data-aos="zoom-in" class="col-xl-4 col-lg-4 col-md-12 col-sm-12 text-center">
				<img src="@/assets/poems.jpg" class="regular" alt="" height="200px"/>
			</div>
		</div>
		<div data-aos="fade" class="text-center content-block">
			<h3>На нашем сайте вы можете:</h3>
		</div>
		<div class="row justify-content-center text-center content-block">
			<div data-aos="fade-down" class="col" v-b-popover.hover.bottomright="'Выбрав в меню [Оцени свой стих], нейросеть оценит вашу рифму и размер стихосложения. Попробуйте сами!'" title="Подсказка">
				<p><i class="fas fa-user"></i> Опубликовать свое стихотворение</p></div>
			<div data-aos="fade-down" class="col" v-b-popover.hover.bottomright="'Нет вдохновения? Желаете попробовать что-то новое? В разделе [Соревнование] Вы сможете написать стих вместе с нейросетью!'" title="Подсказка">
				<p><i class="fas fa-users"></i> Поучаствовать в соревновании</p></div>
            <div data-aos="fade-down" class="col" v-b-popover.hover.bottomright="'В разделе [Лидерборд] Вы сможете посмотреть набранные быллы в категориях [Оцени свой стих] и [Соревнование]. Интересно, кто набрал больше всего очков?'" title="Подсказка">
				<p><i class="fas fa-table"></i> Посмотреть открытый лидерборд</p></div>
		</div>
		<div data-aos="fade" class="text-center content-block">
			<h3>Как это работает?</h3>
		</div>
		<div class="row justify-content-center text-center content-block">
			<div data-aos="fade-right" class="col">
				<p>Режим <i class="fas fa-edit"></i> Оцени свой стих</p>
				<p class="desc">Сначала алогритм решающего дерева разбивает Ваше стихотворение на слога, затем нейросеть расставляет ударения. 
					Используя эту информацию анализатор проверяет рифму и находит стихотворный размер. Чем больше строк рифмуется, тем больше баллов! За трехсложные размеры начисляется больше баллов!</p></div>
			<div data-aos="fade-left" class="col">
				<p>Режим <i class="fas fa-user-alt"></i><b class="fas"> & </b><i class="fas fa-robot"></i> Соревнование</p>
				<p class="desc">Алгоритм тот же, что и предыдущего режима: алогритм решающего дерева разбивает Ваше стихотворение на слога, затем нейросеть расставляет ударения. 
					Используя эту информацию анализатор проверяет рифму и находит стихотворный размер. Учтите, что в оценивании участвуют только Ваши строки!</p></div>
		</div>
		<div data-aos="fade" class="text-center content-block">
			<h3>Наша команда</h3><br>
		</div>
		<div class="container">
			<div class="row text-center">
			<div data-aos="zoom-in" class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
				<img src="@/assets/gakhromov.png" class="team-img regular"/>
				<br><br>
				<p class="team-text">Хромов Григорий</p>
				<p class="contact">Почта: <a href="mailto: gakhromov@edu.hse.ru">gakhromov@edu.hse.ru</a></p>
			</div>
			<div data-aos="zoom-in" class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
				<img src="@/assets/mashulgin.png" class="team-img regular"/>
				<br><br>
				<p class="team-text">Шульгин Михаил</p>
				<p class="contact">Почта: <a href="mailto: mashulgin@edu.hse.ru">mashulgin@edu.hse.ru</a></p>
			</div>
			<div data-aos="zoom-in" class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
				<img src="@/assets/mdkurysheva.png" class="team-img regular"/>
				<br><br>
				<p class="team-text">Курышева Мария</p>
				<p class="contact">Почта: <a href="mailto: mdkurysheva@edu.hse.ru">mdkurysheva@edu.hse.ru</a></p>
			</div>
			</div>
		</div>
		<br><br>
	</div>
</template>

<style scoped>
.contact {
	font-size: small;
}

.team-text {
    text-align: center;
    font-size: 1.3em;
}

.team-img {
    border-radius: 1000px;
    max-width: 200px;
}

.content-block {
	margin-top: 40px;
}
p {
	font-size: 20px;
	text-align: center;
}

p.desc {
	text-align: justify;
	font-size: 18px;
}
</style>