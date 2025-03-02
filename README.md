# RegenPass: A POAP Platform for Dynamic AR Event Engagement

## Short Description
RegenPass is a next-generation POAP (Proof of Attendance Protocol) platform that transforms event participation into a dynamic, interactive digital experience. By combining geo-location, augmented reality (AR), AI-powered booth recognition, and cross-chain minting via wormhole, RegenPass enables attendees to collect unique, branded POAPs that serve as verifiable proof of their participation—minted on the ideal blockchain network based on the event scene detected.

## Transaction Link

Mint POAP can be viewed here:  
[View Transaction on Sophon](https://testnet.sophscan.xyz/tx/0x4d8f0815ffbc292a7e3a2dbc0930d3a94eeff6891d94190ec4368a1d7f9310d4)

![image](https://github.com/user-attachments/assets/b558c31a-f1a0-4ef5-b82f-7c1f5ad1a7c1)


## Key Features

- **zkTLS Email Verification for Invite-Only Access**
  Before entering the event, users must verify their email via zkTLS, ensuring only authorized participants can access RegenPass-enabled events from LUMA etc.

- **Seamless Onboarding & Geo-Verification**  
  Quickly register and verify attendance using geo-location to ensure participants are within designated event zones.

- **Immersive AR Experience**  
  Engage with dynamic AR assets as soon as the camera opens, enhancing the in-person experience with interactive digital overlays.

- **AI-Powered Event Recognition**  
  As soon as the camera activates, the integrated AI agent begins scanning the image. This real-time analysis not only recognizes booth banners and identifies the associated chain (e.g., Avail or Sophon) but also dynamically provides the client with a tailored transaction builder. This ensures that the correct minting process is initiated based on the detected chain booth.


- **Secure, Real-Time Transaction & Wallet Updates**  
  Conduct secure on-chain transactions with immediate updates to the user’s digital wallet, providing verifiable proof of attendance in real time.

## Relevant Use-Cases
- **Event Attendance Verification**  
  Provide a reliable and engaging method for participants to prove their attendance at events, conferences, and expos.

- **Brand Activation & Engagement**  
  Allow brands to create custom POAP experiences (e.g., Chainlink or Base-themed) that boost interaction and leave lasting digital impressions.

- **Community Building & Gamification**  
  Foster community spirit and friendly competition by enabling users to collect, display, and share their unique POAPs across social channels.

- **Marketing & Promotional Campaigns**  
  Enhance event marketing by offering exclusive, collectible digital rewards that can double as discount coupons or access passes for future events.

## User Interaction and Data Flow
1. **Geo-Verification**:  
   The user arrives at the event and is geo-verified to ensure they are within the designated event zone.
2. **Booth Scanning**:  
   The user scans a booth using their mobile camera.
3. **AI Analysis**:  
   The AI agent analyzes booth banners to determine the corresponding blockchain.
4. **AR Engagement**:  
   Augmented reality overlays provide interactive digital assets related to the event, enhancing the overall experience.
5. **Transaction Building**:  
   A tailored transaction builder is provided based on the detected blockchain.
6. **Minting Confirmation**:  
   Upon user confirmation, the transaction is executed on the correct chain via wormhole.
7. **POAP Issuance**:  
   The POAP is minted and immediately displayed in the user’s wallet.

## Project Architecture and Development Process
- **Frontend**:  
  A mobile-first web interface with integrated camera functionality for real-time scanning.
- **Backend**:  
  Incorporates AI-powered booth recognition, geo-fencing for event verification, and AR enhancements.
- **Smart Contracts**:  
  Deployed on Sophon supporting direct minting.


