import React from 'react'
import styled from 'styled-components'

export const Hamburger = props => (
  <HamburgerContainer >
    <div className={ props.clicked ? `${'hamburger'} ${'open'}` : `${'hamburger'} ${'closed'}` }>
      <div className='bar bar1' />
      <div className='bar bar2' />
      <div className='bar bar3' />
    </div>
  </HamburgerContainer>
)

const HamburgerContainer = styled.div`

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;

		.bar {
			width: 30px;
			height: 3px;
			background-color: var(--primary-4);
			margin: 4px 0;
			border-radius: 10px;
		}
	}

	.hamburger .bar1 {
		transform: rotate(45deg) translate(5px, 4px);
	}
	.hamburger .bar2 {
		transform: opacity(1);
	}
	.hamburger .bar3 {
		transform: rotate(-45deg) translate(5px, -4px);
	}

	.hamburger.open .bar1 {
		animation: barOneOpen 0.3s forwards;
	}
	.hamburger.open .bar2 {
		animation: fadeOut 0.5s forwards;
	}
	.hamburger.open .bar3 {
		animation: barThreeOpen 0.3s forwards;
	}
	.hamburger.closed .bar1 {
		animation: barOneClosed 0.3s forwards;
	}
	.hamburger.closed .bar2 {
		animation: fadeIn 0.5s forwards;
	}
	.hamburger.closed .bar3 {
		animation: barThreeClosed 0.3s forwards;
	}

	@keyframes barOneOpen {
		from {
			width: 30px;
			transform: rotate(0) translate(0,0);
		}
		to {
			width: 35px;
			transform: rotate(45deg) translate(5px, 4px);
		}
	}
	@keyframes fadeOut {
		from {
			transform: translateX();
			opacity: 1;
		}
		to {
			transform: translateX(50px);
			opacity: 0;
		}
	}
	@keyframes barThreeOpen {
		from {
			width: 30px;
			transform: rotate(0) translate(0,0);
		}
		to {
			width: 35px;
			transform: rotate(-45deg) translate(5px, -4px);
		}
	}

	@keyframes barOneClosed {
		from {
			width: 35px;
			transform: rotate(45deg) translate(5px, 4px);
		}
		to {
			width: 30px;
			transform: rotate(0deg) translate(0,0);
		}
	}
	@keyframes fadeIn {
		from {
			width: 35px;
			opacity: 0;
			transform: translateX(50px);
		}
		to {
			width: 30px;
			opacity: 1;
			transform: translateX(0px);
		}
	}
	@keyframes barThreeClosed {
		from {
			width: 35px;
			transform: rotate(-45deg) translate(5px, -4px);
		}
		to {
			width: 30px;
			transform: rotate(0deg) translate(0,0);
		}
	}

`

export const List = props => (
  <ListContainer>
    <div className={ props.clicked ? 'listComponent open' : 'listComponent closed' }>
      <div className='x x1' />
      <div className='bars'>
        <div className='bar bar1'>
          <div className='dot dot1' />
          <div className='line line1' />
        </div>
        <div className='bar bar2'>
          <div className='dot dot2' />
          <div className='line line2' />
        </div>
        <div className='bar bar3'>
          <div className='dot dot3' />
          <div className='line line3' />
        </div>
      </div>
      <div className='x x2' />
    </div>
  </ListContainer>
)

const ListContainer = styled.div`

	.listComponent {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.bar {
		display: flex;
		margin: 3px 0;
		display: flex;
		align-items: center;
		.dot, .line {
			border-radius: 10px;
		}
		.dot {
			width: 4px;
			height: 4px;
			background-color: var(--primary-4);
			margin-right: 3px;
		}
		.line {
			width: 25px;
			height: 3px;
			background-color: var(--primary-4);
		}
	}
	.x {
		width: 3px;
		height: 30px;
		background-color: var(--primary-4);
	}
	.x1 { transform: rotate(-38deg) translate(15px, -24px); }
	.x2 { transform: rotate(38deg) translate(-13px, -30px); }


	.listComponent.open .bar { animation: hideBarsopen .3s forwards ease-out; }
	.listComponent.open .x1 { animation: x1open .3s forwards ease-out; }
	.listComponent.open .x2 { animation: x2open .3s forwards ease-out; }
	.listComponent.closed .bar { animation: hideBarsclosed .3s forwards ease-out; }
	.listComponent.closed .x1 { animation: x1closed .3s forwards ease-out; }
	.listComponent.closed .x2 { animation: x2closed .3s forwards ease-out; }

	@keyframes hideBarsopen {
		from { transform: translateY(0); }
		to { transform: translateY(38px); }
	}
	@keyframes x1open {
		from { transform: rotate(-38deg) translate(15px, -24px); }
		to { transform: rotate(-38deg) translate(15px, 11px); }
	}
	@keyframes x2open {
		from { transform: rotate(38deg) translate(-13px, -30px); }
		to { transform: rotate(38deg) translate(-13px, 10px); }
	}
	@keyframes hideBarsclosed {
		from { transform: translateY(38px); }
		to { transform: translateY(0); }
	}
	@keyframes x1closed {
		from { transform: rotate(-38deg) translate(15px, 11px); }
		to { transform: rotate(-38deg) translate(15px, -24px); }
	}
	@keyframes x2closed {
		from { transform: rotate(38deg) translate(-13px, 10px); }
		to { transform: rotate(38deg) translate(-13px, -30px); }
	}

`

export const AddPlus = props => (
  <AddPlusContainer>
    <div className='addBar1'></div>
    <div className='addBar2'></div>
  </AddPlusContainer>
)

const AddPlusContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	.addBar1, .addBar2 {
		position: absolute;
		top: 0;
		left: 0;
		width: 4px;
		height: 30px;
		border-radius: 10px;
		background-color: var(--primary-6);
	}
	.addBar1 {
		transform: translate(19px, 4px);
	}
	.addBar2 {
		transform: translate(19px, 5px) rotate(90deg);
	}
`

export const ReturnChevron = () => (
  <ReturnChevronContainer>
    <div className='bar1'></div>
    <div className='bar2'></div>
  </ReturnChevronContainer>
)

const ReturnChevronContainer = styled.div`
	.bar1, .bar2 {
		width: 4px;
		height: 20px;
		border-radius: 10px;
		background-color: var(--primary-6);
	}
	.bar1 {
		transform: translate(12px, 4.5px) rotate(50deg);
	}
	.bar2 {
		transform: translate(12px, -4.5px) rotate(-50deg);
	}
`
export const UpVote = () => (
  <UpVoteContainer>
    <div className='up1'/>
    <div className='up'/>
    <div className='up2'/>
  </UpVoteContainer>
)

const UpVoteContainer = styled.div`

	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
	margin-top: 5px;

	.up1, .up2, .up {
		width: 4px;
		border-radius: 10px;
		background-color: var(--primary-6);
	}
	.up1, .up2 {
		height: 15px;
	}
	.up1 {
		transform: rotate(35deg);
	}
	.up2 {
		transform: rotate(-35deg);
	}
	.up {
		height: 30px;
	}
`

export const DownVote = () => (
  <DownVoteContainer>
    <div className='down1'/>
    <div className='down'/>
    <div className='down2'/>
  </DownVoteContainer>
)

const DownVoteContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: baseline;
	width: 100%;
	height: 100%;
	margin-top: 5px;

	.down1, .down2, .down {
		width: 4px;
		border-radius: 10px;
		background-color: var(--primary-6);
	}
	.down1, .down2 {
		height: 15px;
	}
	.down1 {
		transform: rotate(-35deg);
	}
	.down2 {
		transform: rotate(35deg);
	}
	.down {
		height: 30px;
	}

`
