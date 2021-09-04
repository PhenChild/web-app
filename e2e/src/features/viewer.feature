Feature: Viewer Page ft

    Display registers table
    Scenario: Register in viewer page
        Given I am on the register page
        When I do nothing
        Then I should see the tables with registers

    Scenario: Chart form in viewer page
        Given I am on the chart page
        When I do nothing
        Then I should see the form
