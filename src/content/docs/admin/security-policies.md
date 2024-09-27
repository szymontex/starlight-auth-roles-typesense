---
title: "Security Policies"
slug: 'admin/security-policies'
description: "Security policies and best practices to protect the system."
---

# Security Policies

This document outlines the security policies and best practices that must be followed to protect the system and its data.

## Password Management

- **Complexity**: Passwords must be at least 12 characters long and include a mix of uppercase, lowercase, numbers, and special characters.
- **Expiration**: Passwords must be changed every 90 days.
- **Storage**: All passwords must be hashed using a strong hashing algorithm such as bcrypt.

## Network Security

- **Firewall**: Ensure that only necessary ports are open. Use firewalls like `ufw` or `iptables`.
- **Encryption**: All data in transit must be encrypted using TLS.
- **VPN**: Remote access to the server must be conducted over a VPN.

## Monitoring

- **Logging**: All system and application logs should be stored securely and monitored regularly.
- **Intrusion Detection**: Implement intrusion detection systems (IDS) to monitor for suspicious activity.
