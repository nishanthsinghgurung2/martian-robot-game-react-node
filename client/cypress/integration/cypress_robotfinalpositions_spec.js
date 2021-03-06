describe('Get final robots positions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('should get the robot final coordinates for non lost robot', () => {
        cy.get('#text-upper-coords')
            .should('be.visible')
            .type('5 3')
        cy.get('#robot-0')
            .should('be.visible')
            .type('1 1 E')
        cy.get('#instruction-0')
            .should('be.visible')
            .type('RFRFRFRF')
        cy.get('#get-final-robot-positions')
            .should('be.visible')
            .click()
        
        cy.contains('1 1 E')
            .should('be.visible')
    })
    
    it('should get the robot final coordinates for lost robot', () => {
        cy.get('#text-upper-coords')
            .should('be.visible')
            .type('5 3')
        cy.get('#robot-0')
            .should('be.visible')
            .type('3 2 N')
        cy.get('#instruction-0')
            .should('be.visible')
            .type('FRRFLLFFRRFLL')
        cy.get('#get-final-robot-positions')
            .should('be.visible')
            .click()
        
        cy.contains('3 3 N LOST')
            .should('be.visible')
    })

    it('should get the robot final coordinates for a mix of lost and non lost robots', () => {
        cy.get('#text-upper-coords')
            .should('be.visible')
            .type('5 3')
        cy.get('#robot-0')
            .should('be.visible')
            .type('1 1 E')
        cy.get('#instruction-0')
            .should('be.visible')
            .type('RFRFRFRF')
        cy.get('#add-robots')
            .should('be.visible')
            .click()
        cy.get('#robot-1')
            .should('be.visible')
            .type('3 2 N')
        cy.get('#instruction-1')
            .should('be.visible')
            .type('FRRFLLFFRRFLL')
        cy.get('#add-robots')
            .should('be.visible')
            .click()
        cy.get('#robot-2')
            .should('be.visible')
            .type('0 3 W')
        cy.get('#instruction-2')
            .should('be.visible')
            .type('LLFFFLFLFL')
        cy.get('#get-final-robot-positions')
            .should('be.visible')
            .click()
        
        cy.contains('1 1 E')
            .should('be.visible')
        cy.contains('3 3 N LOST')
            .should('be.visible')
        cy.contains('2 3 S')
            .should('be.visible')
    })

    describe('Validation errors', () => {
        it('should show validation error for invalid upper coordinates and disable Get Final Robot Positions button', () => {
            cy.get('#text-upper-coords')
            .should('be.visible')
            .type('500 300')
            .blur()

            cy.contains('Invalid upper coordinates')
            .should('be.visible')

            cy.get('#get-final-robot-positions').should('be.disabled')
        })

        it('should show validation error for invalid robot position and disable Get Final Robot Positions button', () => {
            cy.get('#robot-0')
            .should('be.visible')
            .type('1 1 P')
            .blur()

            cy.contains('Invalid robot position')
            .should('be.visible')
            cy.get('#get-final-robot-positions').should('be.disabled')
        })

        it('should show validation error for invalid robot instruction and disable Get Final Robot Positions button', () => {
            cy.get('#instruction-0')
            .should('be.visible')
            .type('RFRFPRR')
            .blur()

            cy.contains('Invalid robot instruction')
            .should('be.visible')
            cy.get('#get-final-robot-positions').should('be.disabled')
        })
    })
})