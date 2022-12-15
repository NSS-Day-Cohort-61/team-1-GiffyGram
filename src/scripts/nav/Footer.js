export const Footer = () => {
    return `
        <footer class="footer">
            <div class="footer__item">
                Posts since
                <select class="selectbox_year" id="">
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>
                [POSTCOUNT]
            </div>
            <div class="footer__item">
                Posts by user
                <select class="selectbox_user" id="">
                    <option>Ray Medrano</option>
                    <option>Mark Ellis</option>
                    <option>Daniella Agnoletti</option>
                    <option>Kimmy Bird</option>
                    <option>Emily Lemmon</option>
                </select>
            </div>
            <div class="footer__item">
                Show only favorites
                <input type="checkbox" id="checkbox_favorites" name="favorites">
            </div>
       </footer> `
}