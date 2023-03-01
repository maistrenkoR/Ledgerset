Feature: Playwright demo tests


    Scenario: Send email
        Given I log in
        And I navigate to Postal Service page
        Then I see avaliable options '<Options>'
        When I click on the '<Page>' link
        Then I see '<Page>' page
        When I fill all required information for the letter
        And I click on 'Надіслати'
        Then Email sent

        Examples:
            | Options                                       | Page           |
            | Вхідні, Відправлені, Чернетки, Видалені, Спам | Створити листа |